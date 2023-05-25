<script>
    function addNewJob() {

    }
</script>
  
<div class ="m-5" on-submit = {addNewJob}>
<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Job Title</span>
  </label>
  <input type="text" name="title" placeholder="Software Engineer" class ="input input-bordered w-full">
</div>

<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Minimum Annual Compensation</span>
  </label>
  <input type="number" name="minAnnualCompensation" placeholder="40000" class ="input input-bordered w-full">
  <label class="label" for="salary">
  <span class="label-text-alt">USD</span>
  <span class="label-text-alt">per annum</span>
  </label> 
</div>
<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Maximum Annual Compensation</span>
  </label>
  <input type="number" name="maxAnnualCompensation" placeholder="400000" class ="input input-bordered w-full">
  <label class="label" for="salary">
  <span class="label-text-alt">USD</span>
  <span class="label-text-alt">per annum</span>
  </label> 
</div>

<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Company Name</span>
  </label>
  <input type="text" name="employer" placeholder="e.g. Apple" class ="input input-bordered w-full">
</div>

<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Job Location</span>
  </label>
  <input type="text" name="location" placeholder="e.g. New York" class ="input input-bordered w-full">
</div>

<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Description</span>
  </label>
  <textarea class="textarea textarea-bordered h-64" name="description" placeholder></textarea>
</div>

<div class ="form-control w-full mt-5">
  <label class="label" for="title">
    <span class="label-text">Requirements</span>
  </label>
  <textarea class="textarea textarea-bordered h-64" name="requirements" placeholder></textarea>
</div>

<div class ="form-control w-ful mt-5">
  <label class="label" for="title">
    <span class="label-text">Application Instructions</span>
  </label>
  <textarea class="textarea textarea-bordered h-30" name="applicationInstructions" placeholder></textarea>
</div>
<button class ="btn btn-md w-full mt-5">
  <div class="hidden" role="status"></div>
    Post Job
</button>
</div>