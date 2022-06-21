import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onSubmit) => html`
    <!--Login Page-->
    <section id="loginPage">
            <form  @submit=${onSubmit} class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>
`;

export function loginPage(ctx){
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    const em = document.getElementById('email');
    const pww = document.getElementById('password');

    if(em.value == '' || pww.value == ''){
        return window.alert('All fields are required!');
    }
     

    await login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}