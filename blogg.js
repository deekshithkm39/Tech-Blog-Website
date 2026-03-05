
// //funtions to implement
// to toogle form,to toggle dark mode 
// for ading the post
// for viewing the post
// for closing the post
//we will use local storage for storing the blogs
//FUNCTION FOR LOADING BOOKMARKS AND THEN FUNCTION FOR SAVING IT
let bookmarks=[];
let posts=[];
let currentview="all";
function toggleForm(){
    const form=document.getElementById('form-con');
    form.classList.toggle("hidden");
}
const domains = [
  "All",
  "Artificial Intelligence",
  "Cybersecurity",
  "Web Development",
  "Cloud Computing",
  "Programming"
];
//local storage converts array into json string and stores in browser
//toggle works like if te form is hiiden it shows 
//if its visible it hides
function toggleTheme(){
   //for toggling first we have to detect the html classes
   document.documentElement.classList.toggle('dark');
   //now save the theme 
   if(document.documentElement.classList.contains('dark')){
    localStorage.setItem("theme","dark");
   }
   else localStorage.setItem("theme","light");

}
function loadbookmarks(){
    const saved=localStorage.getItem('bookmarks');
    if(saved){
        bookmarks=JSON.parse(saved);
    }
}
function savebookmarks(){
    //set makes an insertion type in key value pair where bookmarks is key
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}
function isbookmark(title){
    for(let i=0; i<bookmarks.length; i++){
        if(bookmarks[i].title === title){
            return true;
        }
    }
    return false;
}
//function for toogling like if it dosent contain bookamrk alr it'll toggle
function tooglemarks(title,content){
       const index = bookmarks.findIndex(b => b.title === title);
       if(index>-1){
        bookmarks.splice(index,1);//remove one item at that index if user alr added to bookmrk
       }
       else bookmarks.push({title,content});
       savebookmarks();
       if(currentview==="bookmarks"){
        rendermarks();
       }
       else{
        renderPosts(posts);
       }
}

//we'll have some preloaded posts
const defaultPosts = [
{
title: "The Rise of AI Agents",
content: `The internet is entering a new era where software does not just respond to users but acts independently on their behalf. These systems, known as AI agents, can plan tasks, use tools, interact with websites, and collaborate with other agents.

What Are AI Agents?
An AI agent is software powered by large language models that can understand goals in natural language, break them into steps, execute actions via APIs or tools, and adapt based on results.

Real-World Applications
Personal productivity agents manage email and calendars. Developer agents write and test code. Business agents automate support and operations.

Challenges
AI agents still face reliability issues, hallucinations, permission risks, and cost of continuous reasoning.

Future Outlook
AI agents may become the primary users of the internet.`
},

{
title: "Edge Computing Explained",
content: `Edge computing is transforming how data is processed by moving computation closer to users instead of distant cloud servers.

In traditional cloud systems, data travels long distances to centralized data centers. Edge computing places servers near devices, reducing latency and improving speed.

Benefits
Ultra-low latency, reduced bandwidth usage, improved privacy, and offline resilience make edge computing ideal for real-time applications.

Use Cases
Smart cities, IoT sensors, autonomous vehicles, and cloud gaming rely heavily on edge infrastructure.

Future
As billions of devices connect to the internet, edge computing will become essential for responsive digital experiences.`
},

{
title: "WebAssembly: The Future of Web Apps",
content: `WebAssembly (Wasm) is a low-level binary format that allows high-performance code to run inside web browsers at near-native speed.

Developers can compile languages like C, C++, and Rust into Wasm and execute them securely on the web.

Why It Matters
Wasm enables browser games, video editors, CAD tools, and AI applications to run efficiently without plugins.

Beyond Browsers
WebAssembly is expanding into servers and edge computing, enabling portable and secure execution across environments.

Impact
It brings native-level performance to the web and expands what web applications can achieve.`
},

{
title: "Quantum Computing Basics",
content: `Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, unlike classical bits which are only 0 or 1.

Through superposition and entanglement, quantum computers can explore many possibilities at once.

Applications
Drug discovery, cryptography, optimization, and complex simulations could be revolutionized by quantum computing.

Challenges
High error rates, fragile hardware, and extreme cooling requirements currently limit scalability.

Future
Quantum computers will likely complement classical computers for specialized tasks rather than replace them.`
},

{
title: "The Evolution of Programming",
content: `Programming has evolved from machine code to high-level languages and now toward natural language interaction with AI.

Developers increasingly describe features in plain English while AI generates and refactors code.

Benefits
Faster development, lower barriers to entry, and rapid prototyping are transforming software creation.

Risks
Over-reliance on AI and reduced deep coding skills are emerging concerns.

Future Developers
The role of developers may shift toward architecture, system design, and AI orchestration rather than manual coding.`
}
];
function loadp(){
    const saved = localStorage.getItem("posts");
    if(saved){
        posts = JSON.parse(saved);
    } else {
        posts = defaultPosts;
        savep();
    }
}

function savep(){
localStorage.setItem("posts", JSON.stringify(posts));
}
//function for toggling a boomark we need



//function that takes title,content creates a 
//styled blog card and adds to page
function create(title,content){
    const blgrid=document.getElementById("blog-grid");
    //create new card
    const card=document.createElement("div");
    
    //applt tw styilng
    card.className="bg-white dark:bg-gray-900 p-5 hover:scale-[1.02] hover:shadow-lg rounded-xl transition";
    //check if the bookamrk is present oe not
   

card.innerHTML = `
<div class="flex justify-between items-start">
    <h3 class="text-xl font-bold mb-2">${title}</h3>
    <button class="bookmark text-xl">
        ${isbookmark(title) ? "🔖" : "📑"}
    </button>
</div>

<p class="text-gray-600 dark:text-gray-300 line-clamp-2">${content}</p>
`;
const bookbtn=card.querySelector('.bookmark');
bookbtn.onclick=(e)=>{
    e.stopPropagation();//stop propgation we use as alredy in parent we are usign an click event for card tht displays content
    tooglemarks(title,content);
}


    //clickable card that is when user clicks it should open content
    card.onclick = function(){
    openmodal(title, content);
};


    blgrid.appendChild(card);
} 
function addpost(){
//take input of title and content
const titinp=document.getElementById("btitle");
const continp=document.getElementById("blog-content");
const title=titinp.value.trim();
const content=continp.value.trim();
 if (title===""||content==="") {
        alert("Please fill in both fields.");
        return;
    }
    const newpost={title,content};
    posts.push(newpost);
    savep();
    create(title,content);
    titinp.value="";
    continp.value="";
    toggleForm();
}
//function to render domain tabs on load
function renderdomain(){
  const dcon = document.getElementById("domain-tabs");
  dcon.innerHTML = "";

  domains.forEach((d,i)=>{
    const tab = document.createElement("button");
    tab.textContent = d;

    tab.className =
      "pb-2 border-b-2 border-transparent hover:border-indigo-500";

    if(i===0){
      tab.classList.add("border-indigo-600","text-indigo-600");
    }

    dcon.appendChild(tab);   // ⭐ required to show tabs
  });
}

//this fun takes the blog ocontent and puts them inside popuo
//and makes the popup visible thts when the user clicks the card
function openmodal(title,content){
    const modal=document.getElementById("pmodal");
    const mc=document.getElementById("modal-content");
   mc.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${title}</h2>

        <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">${content}</p>
    `;
    modal.classList.remove("hidden");
}
function closemodal(){
    const modal = document.getElementById("pmodal");
    modal.classList.add("hidden");
}
//now when we search posts according to our requirement we need to render posts
function renderPosts(list){
    const grid = document.getElementById("blog-grid");
    grid.innerHTML = "";
    if(list.length===0){
        grid.innerHTML=`<p class="text-gray-500">No posts found.</p>`;
        return;
    }
    list.forEach(p => create(p.title, p.content));
}
//now implement the real search fun
function setsearch(){
    const searchinp=document.getElementById("search");
    searchinp.addEventListener("input",function(e){
        const q=e.target.value.toLowerCase();
        const filtered = posts.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q)
        );
        renderPosts(filtered);
    });
}
//function for rendering bookmarked
function rendermarks(){
     const grid=document.getElementById("blog-grid");
    grid.innerHTML="";
    if(bookmarks.length===0){
        grid.innerHTML=`<p class="text-gray-500">No bookmarked posts.</p>`;
        return;
    }

    bookmarks.forEach(p=>create(p.title,p.content));
}
function showbookmarks(){
    currentview="bookmarks";
    rendermarks();
}

function showall(){
    currentview="all";
    renderPosts(posts);
}
//so for ai gen we can use an api calling 

async function gen(){
var aitit=document.getElementById('btitle');
var textarea=document.getElementById('blog-content');
var orgtit=aitit.value.trim();
if(orgtit==""){
    alert("enter a valid title");
    return;
}
textarea.value="GENERATING YOUR REQUIRED CONTENT......";
try{
    //call gemini api and use an await function as it takes some time 
    //our flow is broweser crreates json and and sends post request to gemini and gemini needs
    //prompt in the structure and gemini reads the title use post as we are sending data and then 
     var response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyBw7q90k2SI4FmPAm9Tb8MocU4yszb_qOM",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Write a detailed tech blog post with introduction, sections, and conclusion about: " + orgtit
                                }
                            ]
                        }
                    ]
                })
            }
        );
        var data = await response.json();
        var text = "";

        if(data.candidates){
            if(data.candidates.length > 0){
                if(data.candidates[0].content){
                    if(data.candidates[0].content.parts){
                        if(data.candidates[0].content.parts.length > 0){
                            text = data.candidates[0].content.parts[0].text;
                        }
                    }
                }
            }
        }
        if(text === ""){
            throw new Error("No content generated");
        }
        textarea.value = text;
}

catch(error){
        console.error(error);
        textarea.value = "";
        alert("AI generation failed");
    }

}
window.onload = function(){
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark"){
        document.documentElement.classList.add("dark");
    }
    loadp();
    loadbookmarks();   
    renderPosts(posts);
    setsearch();
    renderdomain();
};
