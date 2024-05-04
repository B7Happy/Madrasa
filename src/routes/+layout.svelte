<script>
	import '../app.pcss';
  import { userProfile } from '$lib/Store/userStore'; 
  import { page } from '$app/stores';
  console.log(page);
  import { goto } from '$app/navigation';
  function logout(){
		$userProfile = { isLoggedIn: false, role: ''};
    goto('/Dashboard');
	}
  function login(){
    goto('/Login');
	}
</script>
<header class="bg-white">
    <div class="mx-auto px-4 flex justify-between items-center border-b border-gray-200 sticky mb-10 pt-4">
 
      {#if ($userProfile.isLoggedIn === true)}
      <a href="/Dashboard" class="mr-auto mb-5">
        <img src="MLogo.png" alt="Logo" style="width: 24%;">
      </a> 
      <nav class="space-x-4 pb-2">
        <a href="/Eleves" class="text-gray-700 hover:text-gray-900">Eleves</a>
        <a href="/Professeurs" class="text-gray-700 hover:text-gray-900">Professeurs</a>
        
        <button on:click={logout} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Deconnecter
        </button>
         
        <!-- <a href="#" class="text-gray-700 hover:text-gray-900">Matières</a>
        <a href="#" class="text-gray-700 hover:text-gray-900">Notes</a> -->

      </nav>
      {/if}
      {#if ($userProfile.isLoggedIn === false)}
      <a href="/" class="mr-auto mb-5">
        <img src="MLogo.png" alt="Logo" style="width: 24%;">
      </a> 

      <nav class="space-x-4 pb-2">

        <!-- <a href="/Login" class="text-gray-700 hover:text-gray-900 pl-5">Connexion</a> -->
        <!-- <a href="#" class="text-gray-700 hover:text-gray-900">Matières</a>
        <a href="#" class="text-gray-700 hover:text-gray-900">Notes</a> -->
        <button on:click={login} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Connexion
        </button>
      </nav>
      {/if}
    </div>
  </header>
<slot />

