import { html } from "../../node_modules/lit-html/lit-html.js";


const homeTemplate = () => html`
    <!--Welcome Page-->
    <section class="welcome-content">
            <article class="welcome-content-text">
                <h1>We Care</h1>
                <h1 class="bold-welcome">Your Pets</h1>
                <p>Made by Emre Dzhebir</p>
            </article>
            <article class="welcome-content-image">
                <img src="./images/header-dog.png" alt="dog">
            </article>
        </section>
`;

export function homePage(ctx){
    ctx.render(homeTemplate());
}