<style>
@import "/JobList.css";
</style>
<template>
  <div class="container">
    <div>
      <Toast ref="toast" />

      <div class="d-flex w-100">
        <h3 style="text-align: left;">{{ $t("filter.filter") }}</h3>
        <div class="d-flex ml-auto" style="padding-top: 6px;">
          <div
            :class="{ 'd-none': !category }"
            style="padding: 0 15px;"
            v-for="category in filterCategory"
            :key="category"
          >
            <input
              type="checkbox"
              :id="'category-' + category"
              :value="category"
              v-model="selectedCategories"
              @change="filterJobs"
            />
            <label :for="'category-' + category">{{ category }}</label>
          </div>
        </div>
        <div style="width: 55%;">
          <b-button
            variant="btn btn-outline-primary mb-5"
            v-b-modal.modal-add-job
            class="float-end"
          >
            {{ $t("add.job") }}
          </b-button>
        </div>
      </div>
      <div class="mb-3" style="margin-left: 72%;">
          <button class="btn btn-success" @click="exportExcel">
           <i class="fa fa-file-excel-o" aria-hidden="true"></i>
            {{ $t("excel.export_excel") }}
          </button>
          <button class="btn btn-warning" @click="exportCSV">
            <i class="fa fa-bars" aria-hidden="true"></i>
            {{ $t("excel.export_csv") }}

          </button>
      </div>
      <div>
        <div>
          <b-modal id="modal-add-job" title="Add Job" hide-footer>
            <b-form-group label="Image">
              <b-form-file v-model="newJob.img_job" @change="upload" ref="file-input" class="mb-2"></b-form-file>

            </b-form-group>
            <b-form-group label="Email">
                <b-form-input
                v-model="newJob.email"
                v-validate="'required|email'"
                data-vv-validate-on="input"
                name="email"
                type="text"
              ></b-form-input>
              <span class="text-danger">{{ errorMessage }}</span>
            </b-form-group>
            <b-form-group :label="$t('detail.name')">
              <b-form-input
                v-validate="'required'"
                name="name"
                v-model="newJob.name_job"
              ></b-form-input>
              <span class="text-danger">{{ errors.first("name") }}</span>
            </b-form-group>
            <b-form-group :label="$t('detail.category')">
              <b-form-select
                class="form-control"
                name="category"
                v-validate="'required'"
                v-model="newJob.category"
                :options="categories"
              ></b-form-select>
              <span class="text-danger">{{ errors.first("category") }}</span>
            </b-form-group>
            <b-form-group :label="$t('detail.description')">
              <b-form-textarea
                v-validate="'required'"
                name="description"
                v-model="newJob.sum_job"
              ></b-form-textarea>
              <span class="text-danger">{{ errors.first("description") }}</span>
            </b-form-group>
            <div class="d-flex float-end">
              <b-button
              type="button"
              variant="secondary"
              class="mt-3"
              style="margin-right: 20px;"
              @click="onCloseModal"
            >
              {{ $t("job-list.close") }}
            </b-button>
            <b-button
              type="button"
              variant="primary"
              class="mt-3"
              @click="onAddJob"
            >
              {{ $t("job-list.save") }}
            </b-button>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <div
        v-for="(job, index) in filteredJobs"
        :key="job.name_job"
        :style="{ 'margin-right': index % 4 !== 3 ? '35px' : 0 }"
      >
        <div class="job-item p-2">
          <div class="jobID">
            <h5 style="margin-left: 10px; margin-top: 10px;">{{ job.id }}</h5>
          </div>
          <div style="margin-left: 205px;">
            <b-dropdown toggle-class="btn btn-light float-right" no-caret right>
              <template #button-content>
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
              </template>
              <b-dropdown-item
                style="text-align: right;"
                :to="'/job-detail/' + job.id"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </b-dropdown-item>
              <b-dropdown-item
                style="text-align: right;"
                @click="onDeleteJob(job.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <div style="display: flex;">
            <img
              :src="job.img_job ? require(`@/assets/img/${job.img_job}`) : ''"
              :alt="job.name_job"
              class="float-start"
              width="100"
              height="100"
              style="display: block; margin: auto;border-radius: 50%;"
            />
          </div>
          <h5 class="text-center mt-2">{{ job.name_job }}</h5>

          <div class="test mt-3">
            <div class="d-flex">
              <i
                class="fa fa-envelope"
                style="margin-top: 10px; margin-left: 5px;"
              ></i>
              <strong class="text-center mt-2" style="margin-left: 10px;">{{
                job.email
              }}</strong>
            </div>
            <div class="d-flex">
              <i class="fa fa-reorder" style="margin-left: 6px;"></i>
              <p
                class="job-description mx-2"
                style="text-align: justify;"
                v-if="job.sum_job"
                v-html="job.sum_job.replace(/\n/g, '<br><br>')"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Toast from './notification.vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { addJob, deleteJob } from '@/services/JobService.js'
export default {
  computed: {
    ...mapGetters({
      jobs: 'jobs',
      filterCategory: 'filterCategory',
      filteredJobs: 'filteredJobs'
    }),
    selectedCategories: {
      get () {
        return this.$store.getters.selectedCategories
      },
      set (value) {
        this.$store.commit('setSelectedCategories', value)
      }
    },
    categories () {
      if (this.jobs.length > 0) {
        const uniqueCategories = this.jobs
          .map(job => job.category)
          .filter((category, index, self) => self.indexOf(category) === index)
        return uniqueCategories
      } else {
        return []
      }
    }
  },

  created () {
    this.$store.dispatch('fetchJobs')
  },
  methods: {
    ...mapActions(['fetchJobs']),
    async onAddJob () {
      this.errorMessage = null
      this.$validator.validateAll()
        .then(async result => {
          if (result) {
            const addedJob = await addJob(this.newJob)
            await this.fetchJobs()
            this.$store.commit('addJob', addedJob)
            this.newJob = {
              id: '',
              email: '',
              name_job: '',
              sum_job: '',
              category: ''

            }
            this.successMessage = this.$t('message.add-success')
            this.$bvToast.toast(this.successMessage, {
              title: 'Success',
              variant: 'success',
              autoHideDelay: 10000,
              appendToast: true,
              solid: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: false,
              noFade: false,
              noHoverPause: true,
              toastClass: 'my-custom-toast-class',
              headerClass: 'my-custom-toast-header-class',
              bodyClass: 'my-custom-toast-body-class'
            })

            this.$bvModal.hide('modal-add-job')
          } else {
            this.$bvToast.toast(this.errorMessage, {
              title: 'Error',
              variant: 'danger',
              autoHideDelay: 10000,
              appendToast: false,
              solid: true,
              toaster: 'b-toaster-top-right'
            })
            this.errorMessage = this.errors.first('email')
          }
        })
    },
    exportExcel () {
      const filteredData = this.filteredJobs.map(job => {
        const filteredJob = {}
        this.columnsToDisplay.forEach(column => {
          filteredJob[column] = job[column]
        })
        return filteredJob
      })

      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(filteredData)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')

      const fileBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
      const file = new Blob([fileBuffer], { type: 'application/octet-stream' })
      const fileName = this.$t('job-list.list') + '.xlsx'

      saveAs(file, fileName)
    },
    exportCSV () {
      const filteredData = this.filteredJobs.map(job => {
        const filteredJob = {}
        this.columnsToDisplay.forEach(column => {
          filteredJob[column] = job[column]
        })
        return filteredJob
      })

      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(filteredData)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')

      const fileBuffer = XLSX.write(workbook, { type: 'array', bookType: 'csv' })
      const file = new Blob([fileBuffer], { type: 'application/octet-stream' })
      const fileName = this.$t('job-list.list') + '.csv'

      saveAs(file, fileName)
    },

    onCloseModal () {
      this.$bvModal.hide('modal-add-job')
    },
    upload (event) {
      console.log(event)
    },
    async onDeleteJob (id) {
      await deleteJob(id)
      await this.fetchJobs()
      this.successMessage = this.$t('message.delete-success')
      this.$bvToast.toast(this.successMessage, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 10000,
        appendToast: true,
        solid: true,
        toaster: 'b-toaster-top-right',
        noCloseButton: false,
        noFade: false,
        noHoverPause: true,
        toastClass: 'my-custom-toast-class',
        headerClass: 'my-custom-toast-header-class',
        bodyClass: 'my-custom-toast-body-class'
      })
    },

    filterJobs () {
      if (this.selectedCategories.includes('default')) {
        return
      }
      this.$store.dispatch('setCategories', this.selectedCategories)
    }
  },
  data () {
    return {
      newJob: {
        id: '',
        img_job: '',
        name_job: '',
        email: '',
        sum_job: '',
        category: ''
      },
      columnsToDisplay: ['name_job', 'email', 'category'],
      successMessage: '',
      errorMessage: null
    }
  },
  components: {
    Toast
  }
}

</script>
