<script>
    import { goto} from '$app/navigation';
    import { PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
    import { getTokenFromLocalStorage, getUserId } from '../../../../utils/auth.js';
    let isLoading = false;
    export let data;

    let title = data.job.title
    let minAnnualCompensation = data.job.minAnnualCompensation
    let maxAnnualCompensation = data.job.maxAnnualCompensation;
    let employer = data.job.employer;
    let location = data.job.location;
    let description = data.job.description
    let requirements = data.job.requirements
    let applicationInstructions = data.job.applicationInstructions

    
    async function updateJob(evt) {
      evt.preventDefault()
      
      const jobData = {
          user: getUserId(),
          id: data.job.id,
          title: evt.target['title'].value,
          minAnnualCompensation: evt.target['minAnnualCompensation'].value,
          maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
          description: evt.target['description'].value,
          requirements: evt.target['requirements'].value,
          applicationInstructions: evt.target['applicationInstruction'].value,
          location: evt.target['location'].value,
          employer: evt.target['employer'].value,
      };
  
      isLoading = true
  
      const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${jobData.id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
           Authorization: getTokenFromLocalStorage()
        },
        body: JSON.stringify(jobData)
      });
      
      if (response.status == 200) {
        goto(`/jobs/${jobData.id}`)
        isLoading = false
      } else {
        isLoading = false;
      }
    }
  </script>
  <form on:submit={updateJob} class="m-10 text-primary">
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Job Title</span>
      </label>
      <input type="text" name="title" placeholder="Software Engineer" class ="input input-bordered w-full text-primary" bind:value={title} required>
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Minimum Annual Compensation</span>
      </label>
      <input type="number" name="minAnnualCompensation" bind:value={minAnnualCompensation} placeholder="40000" class ="input input-bordered w-full text-primary" required>
      <label class="label" for="salary">
      <span class="label-text-alt text-primary">USD</span>
      <span class="label-text-alt text-primary">per annum</span>
      </label> 
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Maximum Annual Compensation</span>
      </label>
      <input type="number" name="maxAnnualCompensation" placeholder="400000" class ="input input-bordered w-full text-primary" bind:value={maxAnnualCompensation} required>
      <label class="label" for="salary">
      <span class="label-text-alt text-primary">USD</span>
      <span class="label-text-alt text-primary">per annum</span>
      </label> 
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Company Name</span>
      </label>
      <input type="text" name="employer" placeholder="e.g. Apple" class ="input input-bordered w-full text-primary" bind:value={employer} required>
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Job Location</span>
      </label>
      <input type="text" name="location" placeholder="e.g. New York" class ="input input-bordered w-full text-primary" bind:value={location} required>
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Description</span>
      </label>
      <textarea class="textarea textarea-bordered h-64" name="description" bind:value={description} placeholder required></textarea>
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Requirements</span>
      </label>
      <textarea class="textarea textarea-bordered h-64" name="requirements"bind:value={requirements} placeholder required></textarea>
    </div>
  
    <div class ="form-control w-full mt-5">
      <label class="label" for="title">
        <span class="label-text text-primary">Application Instructions</span>
      </label>
      <textarea class="textarea textarea-bordered h-30" name="applicationInstruction" bind:value={applicationInstructions} placeholder required></textarea>
    </div>
  
    <div class="form-control w-full mt-4">
      {#if isLoading}
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>
      {/if} 
      <button class="btn btn-md btn-primary" disabled={isLoading}>Update Job Post</button>
    </div>
  </form>