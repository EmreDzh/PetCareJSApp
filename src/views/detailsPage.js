import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as petShopService from '../api/petShop.js'

const detailsTemplate = (pets, user, onDelete, donatePet, donationAmount, isDonated) => html`
    <!--Details Page-->
    <section id="detailsPage">
            <div class="details">
            <div class="animalPic">
                    <img src=${pets.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pets.name}</h1>
                        <h3>Breed: ${pets.breed}</h3>
                        <h4>Age: ${pets.age}</h4>
                        <h4>Weight: ${pets.weight}</h4>
                        <h4 class="donation">Donation: ${donationAmount}$</h4>
                    </div>
                    ${pets.isOwner && user ? html`
                    <div class="actionBtn">
                        <!-- Only for registered user and creator of the pets-->
                        <a href="/edit/${pets._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                        
                    </div>
                    `
                    :
                    nothing
                
                    }
                    ${!pets.isOwner && user && !isDonated ? 
                        html`
                        <div class="actionBtn">
                        <!--(Bonus Part) Only for no creator and user-->
                        <a @click=${donatePet} href="#" class="donate">Donate</a>
                        
                    </div>
                            
                        `
                        :
                        nothing
                    
                        }
                </div>
            </div>
        </section>
`;


export async function detailsPage(ctx){
    const petId = ctx.params.id;
    const pets = await petShopService.getWithId(petId);
    //BONUS
    let user = JSON.parse(localStorage.getItem('user'));
    let donationAmount = await petShopService.getDonateAmount(petId) * 100;
    let isDonated = false;
    
    
    if(ctx.user){
        pets.isOwner = pets._ownerId == ctx.user._id;
        //BONUS
        let totalDonations = await petShopService.totalDonos(petId, user._id);
        isDonated = totalDonations > 0;
    }
    
    ctx.render(detailsTemplate(pets, ctx.user, onDelete, donatePet, donationAmount, isDonated));

    async function onDelete(){
        const cnf = confirm(`Are you sure you want\'t to delete this ${pets.name}?`)

        if(cnf){
            await petShopService.deleteWithId(petId);
            ctx.page.redirect('/');
        }
    }

    //BONUS
    async function donatePet(){
        await petShopService.donatePet({
            petId: petId
        });

    }
}