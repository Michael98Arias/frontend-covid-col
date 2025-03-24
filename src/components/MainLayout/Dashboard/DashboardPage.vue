<template>
    <q-page>
        <div id="map" style="height: 500px; width: 100%;"></div>

        <q-dialog v-model="showModal" persistent>
            <q-card>
                <q-card-section>
                    <div class="text-h6">{{ t('layout.mainLayout.dashboard.departmentInfo.title') }}</div>

                    <div v-if="selectedFeature">
                        <div><strong>{{ t('layout.mainLayout.dashboard.departmentInfo.departmentLabel') }}</strong> {{
                            selectedFeature.properties.NOMBRE_DPT }}</div>
                        <q-table :rows="covidDataRows" :columns="covidDataColumns" :rows-per-page-options="[5, 10, 20]"
                            row-key="key" flat bordered />
                    </div>
                </q-card-section>

                <q-card-actions>
                    <q-btn flat :label="t('layout.mainLayout.dashboard.departmentInfo.closeButton')" color="negative"
                        @click="showModal = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-banner v-if="error" class="bg-red text-white q-mt-md">
            {{ error }}
        </q-banner>
    </q-page>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Loader } from '@googlemaps/js-api-loader';
import { useLogin } from '../../../composables/useLogin';
import { useQuasar } from 'quasar';

const { t } = useI18n(); 

const $q = useQuasar();
const { mergedData, isDataLoaded } = useLogin();
const map = ref(null);

const showModal = ref(false);
const selectedFeature = ref(null);

const covidDataColumns = [
    { name: 'key', label: t('layout.mainLayout.dashboard.covidTable.key'), align: 'left', field: 'key', sortable: true },
    { name: 'value', label: t('layout.mainLayout.dashboard.covidTable.value'), align: 'left', field: 'value', sortable: true },
];

const covidDataRows = computed(() => {
    if (selectedFeature.value && selectedFeature.value.covidData) {
        const covidData = selectedFeature.value.covidData;
        return Object.keys(covidData).map((key) => ({
            key: key,
            value: covidData[key],
        }));
    }
    return [];
});

watch(isDataLoaded, (newVal) => {
    if (newVal) {
        initMap();
    }
});

const initMap = () => {
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        version: 'weekly',
    });

    loader.load().then(() => {
        if (typeof google !== 'undefined' && google.maps) {
            map.value = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 4.5709, lng: -74.2973 },
                zoom: 4,
            });

            if (isDataLoaded.value && mergedData.value.length > 0) {
                drawPolygons(mergedData.value);
            } else {
                $q.notify({
                    type: 'negative',
                    message: t('globalMessages.invalidGovData')
                });
            }
        } else {
            $q.notify({
                type: 'negative',
                message: t('globalMessages.errorFetchingData')
            });
        }
    }).catch(() => {
        $q.notify({
            type: 'negative',
            message: t('globalMessages.errorFetchingData')
        });
    });
};

const drawPolygons = (data) => {
    data.forEach(department => {
        const { geometry } = department;
        if (geometry && geometry.coordinates) {
            const coordinates = geometry.coordinates[0].map(coord => ({
                lat: coord[1],
                lng: coord[0],
            }));

            const polygon = new google.maps.Polygon({
                paths: coordinates,
                strokeColor: '#281c81',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#281c81',
                fillOpacity: 0.35,
            });

            polygon.setMap(map.value);

            google.maps.event.addListener(polygon, 'click', () => {
                selectedFeature.value = { ...department };
                showModal.value = true;
            });
        }
    });
};
</script>

<style scoped>
#map {
    height: 100%;
    width: 100%;
}
</style>