import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
const button = document.getElementById("Button");
const input = document.getElementById("input");
const area = document.getElementById("displayarea");

const dotBtn = document.getElementById("dotBtn");
const menu = document.getElementById("menu");

if (dotBtn && menu) {
  dotBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation(); 
  });

  document.addEventListener("click", () => {
    menu.style.display = "none";
  });
}

function main(){
    const prompt = input.value; // Move this here so fetch can see it
    
    if (prompt.trim() !== "") {
    	const newdiv = document.createElement('div');
    	newdiv.textContent = prompt;
    	newdiv.style.textAlign = 'left';
    	newdiv.style.boxSizing = 'border-box';
    	newdiv.style.paddingTop = '5px';
    	newdiv.style.paddingBottom = '5px';
    	newdiv.style.paddingLeft = '15px';
	newdiv.style.paddingRight = '15px';
    	newdiv.style.fontSize = '22px';
    	newdiv.style.color = '#AEEEEE';
    	newdiv.style.width = 'fit-content';
    	newdiv.style.overflow = 'hidden';
    	newdiv.style.wordWrap = 'break-word';
    	newdiv.style.borderRadius = '0px';
        newdiv.style.whiteSpace = 'normal';
	    newdiv.style.marginBottom = '7px';
        area.appendChild(newdiv);
        
        input.value = ""; // Clear input immediately after UI update
    } else {
        return; // Don't fetch if input is empty
    }

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user_input": prompt})
    })
    .then(response => response.json())
    .then(result => {
        const ans = result.response;
        const html = marked.parse(ans);

        if (ans.trim() !== ""){
    	    const newdiv = document.createElement('div');
    	    newdiv.innerHTML = html;
    	    newdiv.style.textAlign = 'left';
    	    newdiv.style.boxSizing = 'border-box';
    	    newdiv.style.paddingTop = '5px';
    	    newdiv.style.paddingBottom = '80px';
    	    newdiv.style.paddingLeft = '2px';
    	    newdiv.style.fontSize = '22px';
    	    newdiv.style.color = 'white';
    	    newdiv.style.width = '100%';
    	    newdiv.style.overflow = 'hidden';
    	    newdiv.style.wordWrap = 'break-word';
            newdiv.style.whiteSpace = 'normal';
            area.appendChild(newdiv);
        }
    })
    .catch(error => console.error("Error:", error));
}

button.addEventListener("click", () => {
    main();
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    main();
  }
});
