const template = document.createElement('template');

template.innerHTML = `
    <style>
        .user-card {
                font-family: 'Arial', sans-serif;
                background: #f4f4f4;
                width: 500px;
                display: grid;
                grid-template-columns: 1fr 2fr;
                grid-gap: 10px;
                margin-bottom: 15px;
                border-bottom: darkorchid 5px solid;
        }

        .user-card img {
            width: 100%;
        }

        .user-card button {
            cursor: pointer;
            background: darkorchid;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
        }
    </style>
    <div class = "user-card">
        <img width="70"/>
        <div>
            <h3></h3>
            <div id="info">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>
        </div>

        <button id="toggle-info">Hide Info</button>
    </div>
`;

class UserCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');

        
    }

    showInfo = true;

    toggleInfo(){
        this.showInfo = !this.showInfo;

        const infoBlock = this.shadowRoot.querySelector('#info');
        const infoBtn = this.shadowRoot.querySelector('#toggle-info');

        console.log(infoBlock);

        if (this.showInfo){
            infoBtn.innerText = "Hide Info";
            infoBlock.style.display = "block";
        } else {
            infoBtn.innerText = "Show Info";
            infoBlock.style.display = "none";
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', ()=>{
            this.toggleInfo();
        })
    }
}

customElements.define('user-card', UserCard)