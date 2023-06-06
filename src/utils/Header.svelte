<script>
  import { logOut, loggedIn } from './auth';
  import { goto } from '$app/navigation';

  let currentTheme = "night"
  export function navigateToHomePage() {
    goto('/');
  }

  function navigateToPostJobPage() {
      if ($loggedIn) {
          goto('/jobs/post');
      } else {
          goto('/users/new')
      }
  }
  function navigateToLoginPage() {
    goto('/login')
  }
  function toggleTheme() {
    currentTheme = currentTheme === "lemonade" ? "night" : "lemonade";
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

</script>
  
<header class="flex justify-between items-center">
  <button class="btn btn-ghost normal-case text-xl text-primary" on:click={navigateToHomePage}>NEXT Jobs DB</button>
  <div> 
      <div class="flex gap-2 ">
        <button class="btn btn-ghost stroke-primary" on:click={toggleTheme}>
          {#if currentTheme === "lemonade"}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>        
          {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>       
          {/if}
        </button>
          <button class="btn btn-ghost normal-case text-l text-primary" on:click={navigateToPostJobPage}>Post a Job</button>
          
          {#if $loggedIn}
              <button class="btn btn-ghost normal-case text-l text-primary" on:click={logOut}>Logout</button>
          {:else}
              <button class="btn btn-ghost normal-case text-l text-primary" on:click={navigateToLoginPage}>Log In</button>
          {/if}
      </div>
  </div>
</header>
  



