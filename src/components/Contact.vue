<template>
  <v-layout mt-4>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Siemens Mobility GmbH</h3>
            <v-avatar></v-avatar>
            <v-spacer></v-spacer>
            <div>
              <br>MO RS SC BG EN BMD SE
              <br>Eggenberger Straße 31
              <br>8020 Graz, Österreich
              <br>Fax: +43 51707-53507
              <br>Mobil: +43 664 88556238
              <br>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      card_text:
        "Siemens Mobility GmbH<br>\
        MO RS SC BG EN BMD SE\
        Eggenberger Straße 31\
        8020 Graz, Österreich\
        Fax: +43 51707-53507\
        Mobil: +43 664 88556238\
"
    };
  }
};
</script>