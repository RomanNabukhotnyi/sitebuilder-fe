<template>
  <div class="main">
    <div class="tabs">
      <label class="tab"
        >Projects<input type="radio" name="workspaceTab" value="projects" />
      </label>
      <hr />
    </div>
    <div class="panel">
      <div class="panelContainer margin">
        <div class="block"></div>
        <div class="sort" title="Sort by Created" tabindex="0">
          <span class="ellipsis">Created</span
          ><svg class="chevron" width="9" height="6" viewBox="0 0 12 8">
            <path
              fill="#554d56"
              d="M6.003 8c.356 0 .71-.148.982-.442l4.608-4.982c.543-.588.543-1.543-.002-2.132-.546-.593-1.425-.59-1.97-.002L6 4.356 2.383.442C1.84-.145.955-.145.413.444c-.55.593-.548 1.544-.004 2.132l4.605 4.982c.27.293.627.44.984.44L6.002 8z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="search">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="#979197"
            fill-rule="evenodd"
            d="M2.01 11.715c-2.68-2.68-2.68-7.025 0-9.705 2.68-2.68 7.025-2.68 9.705 0 2.35 2.35 2.64 5.978.87 8.643.034.028.068.06.1.09l2.912 2.913c.536.536.54 1.4 0 1.94-.536.537-1.402.54-1.94 0l-2.913-2.91c-.032-.033-.063-.067-.09-.102-2.666 1.77-6.295 1.48-8.644-.87zm1.94-1.94c1.61 1.607 4.216 1.607 5.824 0 1.608-1.61 1.608-4.216 0-5.824-1.608-1.607-4.215-1.607-5.823 0-1.607 1.61-1.607 4.216 0 5.824z"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Filter by name"
          v-model="search"
          @input="filter"
        />
      </div>
      <div class="panelContainer">
        <div class="buttonCreate">
          <button
            type="button"
            class="button primary"
            data-bs-toggle="modal"
            data-bs-target="#createProject"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>

    <create-project :show="true">
      <h1>Create project</h1>
      <input type="text" placeholder="Name" v-model="projectTemp.name" />
    </create-project>

    <div
      class="modal fade"
      id="createProject"
      tabindex="-1"
      aria-labelledby="createProjectLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createProjectLabel">
              Create Project
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="createName" class="col-form-label">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="createName"
                  v-model="projectTemp.name"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.stop="reset"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="createProject"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editProject"
      tabindex="-1"
      aria-labelledby="editProjectLabel"
      aria-hidden="true"
      @click.stop
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editProjectLabel">Edit Project</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="editName" class="col-form-label">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="editName"
                  v-model="projectTemp.name"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.stop="reset"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="editProject()"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="dragDropItems">
      <div style="height: 0px"></div>
      <div data-id="sorted">
        <div v-if="getAllProjects.length !== 0" class="projectsContainer">
          <projects-list
            :projects="getAllProjects"
            @delete="deleteProject"
          ></projects-list>
        </div>
        <div
          v-else-if="getAllProjects.length === 0 && search"
          class="noProjects"
        >
          <h3>No projects with this name or type 🤷‍♀️</h3>
        </div>
      </div>
      <div style="height: 0px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectsList from './components/ProjectsList.vue';
import CreateProject from './components/CreateProject.vue';
import { useProjectsStore } from '../../../stores/projects';

interface Data {
  search: string;
  projectTemp: {
    id?: number;
    name?: string;
  };
}

export default defineComponent({
  components: {
    ProjectsList,
    CreateProject,
  },
  setup() {
    const projectsStore = useProjectsStore();
    return {
      projectsStore,
    };
  },
  data(): Data {
    return {
      search: '',
      projectTemp: {
        id: 0,
        name: '',
      },
    };
  },
  mounted() {
    this.projectsStore.getAllProjectsApi();
  },
  computed: {
    getAllProjects() {
      return this.projectsStore.getAllProjects;
    },
  },
  methods: {
    async filter() {
      await this.projectsStore.getAllProjectsApi();
      this.projectsStore.setProjects(
        this.getAllProjects.filter((project) =>
          project.name.toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
    openProject(projectId: number) {
      this.$router.push(`projects/${projectId}/pages`);
    },
    reset() {
      this.projectTemp = {};
    },
    getEditProject(projectId: number) {
      Object.assign(this.projectTemp, this.projectsStore.getById(projectId));
    },
    async createProject() {
      await this.projectsStore.createProject({ name: this.projectTemp.name! });
      this.reset();
      this.projectsStore.getAllProjectsApi();
    },
    async editProject() {
      await this.projectsStore.editProject(this.projectTemp.id!, {
        name: this.projectTemp.name!,
      });
      this.reset();
      this.projectsStore.getAllProjectsApi();
    },
    async deleteProject(id: number) {
      await this.projectsStore.deleteProject(id);
      this.projectsStore.getAllProjectsApi();
    },
  },
});
</script>

<style scoped>
@import 'projects.css';
</style>
