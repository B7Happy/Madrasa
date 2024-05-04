<script lang="ts">
    import type { Login, User } from '$lib/Class/Type';
	import { logIn } from '$lib/Method/login';
	import { user, userProfile } from '$lib/Store/userStore';
    import { goto } from '$app/navigation';
    import Textfield from '@smui/textfield';
    // import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';
    import Button, { Label, Icon } from '@smui/button';
	let username = '';
	let password = '';
	let error = ''

	async function login() {
        let loginData : Login = { 
            userName : username, 
            password : password}; 
		const responseLogin = await logIn(loginData);
        if (responseLogin.status == 401) {
            error = "Nom d'utilisateur et/ou mot de passe invalide"; 
        }
        if( responseLogin.status == 200){
            let userData = await responseLogin.json();
            $userProfile = { isLoggedIn: true, role: 'Admin'};
            goto('/')
        }
    
        //console.log(responseLogin);
		// if ( user ) {
		// 	console.log(user)
		// 	$store = user
		// 	if ( error ) error = ''
		// }
		// else {
		// 	error = 'Incorrect username and password.'
		// 	console.log("Incorrect username and password.")
		// }

	}

</script>

<div class="container mx-auto">

    <div class=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Connexion
            </h1>
            <form class="space-y-4 md:space-y-6" on:submit|preventDefault={login}>
                <div class="bg-white p-4 rounded-lg">
                    <div class="relative bg-inherit">
                        <input type="text" id="username" name="username" bind:value={username} class="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Nom d'Utilisateur"/><label for="username" class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Nom d'utilisateur</label>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg">
                    <div class="relative bg-inherit">
                        <input type="password" id="password" name="password" bind:value={password} class="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Nom d'Utilisateur"/><label for="username" class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Mot de passe</label>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Se connecter</button>

            </form>
        </div>
    </div>
</div>