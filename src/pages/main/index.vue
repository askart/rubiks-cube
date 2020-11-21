<template>
  <container-layout>
    <template v-slot:row-1>
      <cube-2d />
      <action-panel />
      <action-records />
    </template>
    <template v-slot:row-2>
      <cube-3d />
    </template>
  </container-layout>
</template>

<script>
import ContainerLayout from "@/components/layout/container-layout";

import Cube2d from "./cube-2d";
import ActionPanel from "./action-panel";
import ActionRecords from "./action-records";
import Cube3d from "./cube-3d";

export default {
  name: "Main",
  components: {
    ContainerLayout,
    Cube2d,
    ActionPanel,
    ActionRecords,
    Cube3d
  }
};
</script>
