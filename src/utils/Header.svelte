<script>
    import { isLoggedIn as updateLoggedIn, logOut, loggedIn, logInUser } from './auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let isJobPage = false;
    let isLogInPage = false;
    // let loggedIn = false;

    // function updateLoggedIn() {
    //   loggedIn = true;
    //   console.log("Updated logged in");
    // }

    onMount(() => {
        // Check if the current route matches the job page route
        isLogInPage = location.pathname.includes('/login');
        isJobPage = location.pathname.includes('/postAJobPage');
        setTimeout(updateLoggedIn, 3000);
    });

    export function navigateToHomePage() {
      goto('/');
    }
  
    function navigateToPostJobPage() {
        if (loggedIn === true) {
            goto('/postAJobPage');
        } else {
            goto('/users/new')
        }
    }
    function navigateToLoginPage() {
      goto('/login')
    }
  

  </script>
  
<header class="flex justify-between items-center">
  <button class="btn btn-ghost normal-case text-xl" on:click={navigateToHomePage}>NEXT Jobs DB</button>
  <div> 
  {#if !isJobPage}
      <div class="flex gap-2">
          <button class="btn btn-ghost normal-case text-l" on:click={navigateToPostJobPage}>Post a Job</button>
          
          {#if loggedIn === true}
              <button class="btn btn-ghost normal-case text-l" on:click={logOut}>Logout</button>
              {:else}
              <button class="btn btn-ghost normal-case text-l" on:click={navigateToLoginPage}>Log In</button>
          {/if}
      </div>
  {/if}
  </div>
</header>
  



