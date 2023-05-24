<template>
  <div class="min-w-[80vw] xl:min-w-[40vw] text-white">
    <form
      class="w-full space-y-4 flex flex-col"
      @submit.prevent="mint"
      v-if="!nft"
    >
      {{ data }}
      <textarea
        v-model="prompt"
        placeholder="Please mint an NFT on the Polygon blockchain of a Monkey with blue eyes wearing a hawaiian shirt and send it to domenec@crossmint.io"
        class="p-4 min-h-[150px] rounded-lg bg-white/20 w-full focus:outline-none text-white"
      />
      <button
        v-if="!loading"
        type="submit"
        value="Mint my NFT"
        class="py-2 px-5 rounded-lg bg-green-600 text-white ml-auto"
      >
        Mint my NFT
      </button>
      <p v-else class="py-2 px-5 ml-auto">Loading...</p>
    </form>
    <div class="space-y-4" v-else>
      <div class="md:flex space-x-8">
        <img
          :src="data.data.request.metadata.image"
          alt=""
          class="m-auto md:m-none h-96 rounded"
        />
        <div class="p-8 space-y-8">
          <div class="space-y-2">
            <h1 class="text-2xl font-semibold">
              {{ data.data.request.metadata.name }}
            </h1>
            <h2 class="text-base font-light">
              {{ data.data.request.metadata.description }}
            </h2>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="attribute in data.data.request.metadata.attributes"
              class="p-4 border rounded-lg space-y-2 text-center"
            >
              <h1 class="uppercase text-sm">{{ attribute.value }}</h1>
              <h1 class="uppercase text-sm font-semibold">
                {{ attribute.trait_type.replace("_", " ") }}
              </h1>
            </div>
          </div>
          <p class="font-light">
            This NFT is living on the
            <span class="capitalize">{{
              data.data.response.onChain.chain
            }}</span>
            blockchain.
            <span v-if="data.data.response.onChain.chain == 'polygon'"
              >Its contract address is
              {{ data.data.response.onChain.contractAddress }}.</span
            >
          </p>
        </div>
      </div>
      <div class="flex justify-end">
      <button class="py-2 px-4 rounded bg-green-700 text-white" @click="refresh">Mint another NFT</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false);
const nft = ref(false);
const prompt = ref("");
const data = ref("");

const mint = async () => {
  try {
    loading.value = true;
    const post = await useAsyncData(() =>
      $fetch(`/api/run`, {
        body: {
          description: prompt.value,
        },
        method: "POST",
      })
    );
    data.value = post;
  } catch (e) {
    message.value = e.description || e.message;
  } finally {
    loading.value = false;
    nft.value = true;
  }
};

const refresh = async () => {
  nft.value = false;
  loading.value = false;
  data.value = ''
};
</script>
