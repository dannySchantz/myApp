<script>
    import SvelteMarkdown from 'svelte-markdown';
    import humanize from 'humanize-plus';
    import { goto } from '$app/navigation';
	import { getUserId } from '../../../utils/auth';
    export let data;
    function navigateToEditPage() {
        goto(`/jobs/${data.job.id}/edit`)
    }
</script>

<div class="mt-10 ml-10 mr-10 text-primary">
    <div class="flex items-center justify-between mb-4 text-primary">
        <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
        {#if getUserId() === data.job.user}
        <button class="btn btn-ghost" on:click={navigateToEditPage}>Edit</button>
        {/if}
    </div>

    <div class="grid grid-cols-3">
        <div class="col-span-2">
            <div class="flex">
                <div class="flex-1">
                    <p class="text-xl">{data.job.employer}</p>
                </div>
            </div>

            <div class="prose max-w-none mt-8 text-primary">
                <h2 class="text-xl font-thin text-primary">Description</h2>
                <SvelteMarkdown source={data.job.description} />
                <div class="mt-6" />
                <h2 class="text-xl font-thin text-primary">Requirements</h2>
                <SvelteMarkdown source={data.job.requirements} />
                <div class="mt-6" />
                <h2 class="text-xl font-thin text-primary">How to Apply?</h2>
                <p class="mb-10">{data.job.applicationInstructions}</p>
            </div>
        </div>

        <div class="col-span-1 ml-4 text-primary">
            <h2 class="text-xl font-thin">Location</h2>
            <p>{data.job.location}</p>
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Salary Range</h2>
            <p>
                USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
                data.job.maxAnnualCompensation
                )}
            </p>
        </div>
    </div>
</div>
