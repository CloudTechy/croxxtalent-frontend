<template>
  <div>
    <div class="vx-row mb-5">
      <vx-card title="Current Plan" subtitle="Croxx Talent Free Plan: 0.00 USD">
        <p>
          Upgrade to Premium Plan for access to search, view talent, download
          CVs, and invite talents.
        </p>
        <!-- Upgrade Button -->
        <div class="flex flex-wrap items-center justify-end mt-base">
          <vs-button
            color="success"
            @click="
              $router
                .push({
                  name: 'upgrade-subscription'
                  // params: { item_id: item.objectID }
                })
                .catch(() => {})
            "
          >
            Upgrade</vs-button
          >
        </div>
      </vx-card>
    </div>

    <div class="vx-row">
      <vx-card no-shadow>
        <div class="mb-base">
          <h6 class="mb-4">Croxx Talent Free Plan</h6>
          <div class="flex items-center mb-4">
            <feather-icon icon="CheckIcon" class="text-success" />
            <span class="ml-4">Employer dashboard.</span>
          </div>
          <div class="flex items-center mb-4">
            <feather-icon icon="CheckIcon" class="text-success" />
            <span class="ml-4">Create campaigns.</span>
          </div>
          <div class="flex items-center mb-4">
            <feather-icon icon="XIcon" class="text-danger" />
            <span class="ml-4">Search for talent.</span>
          </div>
          <div class="flex items-center mb-4">
            <feather-icon icon="XIcon" class="text-danger" />
            <span class="ml-4">View talent's CV.</span>
          </div>
          <div class="flex items-center mb-4">
            <feather-icon icon="XIcon" class="text-danger" />
            <span class="ml-4">Download talent's CV.</span>
          </div>
          <div class="flex items-center mb-4">
            <feather-icon icon="XIcon" class="text-danger" />
            <span class="ml-4">Invite talents.</span>
          </div>
        </div>
      </vx-card>
    </div>

    <div class="vx-row"></div>
  </div>
</template>
