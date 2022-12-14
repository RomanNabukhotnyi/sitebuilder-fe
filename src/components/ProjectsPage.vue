<template>
  <div class="main">
    <div class="tabs">
      <label class="tab">Projects<input type="radio" name="workspaceTab" value="projects" />
      </label>
      <hr />
    </div>
    <div class="panel">
      <div class="panelContainer margin">
        <div class="block"></div>
        <div class="sort" title="Sort by Created" tabindex="0">
          <span class="ellipsis">Created</span><svg class="chevron" width="9" height="6" viewBox="0 0 12 8">
            <path fill="#554d56"
              d="M6.003 8c.356 0 .71-.148.982-.442l4.608-4.982c.543-.588.543-1.543-.002-2.132-.546-.593-1.425-.59-1.97-.002L6 4.356 2.383.442C1.84-.145.955-.145.413.444c-.55.593-.548 1.544-.004 2.132l4.605 4.982c.27.293.627.44.984.44L6.002 8z">
            </path>
          </svg>
        </div>
      </div>
      <div class="search">
        <!-- <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="#979197" fill-rule="evenodd"
            d="M2.01 11.715c-2.68-2.68-2.68-7.025 0-9.705 2.68-2.68 7.025-2.68 9.705 0 2.35 2.35 2.64 5.978.87 8.643.034.028.068.06.1.09l2.912 2.913c.536.536.54 1.4 0 1.94-.536.537-1.402.54-1.94 0l-2.913-2.91c-.032-.033-.063-.067-.09-.102-2.666 1.77-6.295 1.48-8.644-.87zm1.94-1.94c1.61 1.607 4.216 1.607 5.824 0 1.608-1.61 1.608-4.216 0-5.824-1.608-1.607-4.215-1.607-5.823 0-1.607 1.61-1.607 4.216 0 5.824z">
          </path>
        </svg> -->
        <input type="search" placeholder="Filter by name" style="width: 94px" v-model="search" @input="filter" />
      </div>
      <div class="panelContainer">
        <div class="buttonCreate">
          <button type="button" class="button primary" data-bs-toggle="modal" data-bs-target="#createProject">
            Create Project
          </button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="createProject" tabindex="-1" aria-labelledby="createProjectLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createProjectLabel">
              Create Project
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="createName" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="createName" v-model="projectTemp.name" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click.stop="reset">
              Close
            </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createProject">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="editProject" tabindex="-1" aria-labelledby="editProjectLabel" aria-hidden="true"
      @click.stop>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editProjectLabel">Edit Project</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="editName" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="editName" v-model="projectTemp.name" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click.stop="reset">
              Close
            </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editProject()">
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
          <div v-for="project in getAllProjects" :key="project.id">
            <div class="cardConteiner">
              <div class="popoverContainer">
                <div class="card">
                  <div class="badgeConteiner">
                    <div class="myBadge">
                      <div class="statusIndicator">
                        <div class="colorDot small yellow"></div>
                        <span class="ellipsis">Sample Project</span>
                      </div>
                    </div>
                  </div>
                  <a @click="openProject(project.id)" data-link-type="inApp">
                    <div class="imageContainer">
                      <img class="projectImage" width="270" height="92"
                        src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2F1ef6e135-a095-40bb-a7a6-ef091643fe44.png?w=270&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=270&amp;cropHeight=92"
                        srcset="
                          https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2F1ef6e135-a095-40bb-a7a6-ef091643fe44.png?w=540&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=540&amp;cropHeight=184 2x
                        " />
                    </div>
                    <div class="cardBody">
                      <div class="typeAndTimeAgo">
                        <div class="projectType">iOS</div>
                        <div class="timeAgo">
                          {{
                              Math.ceil(
                                Math.abs(
                                  new Date(Date.now()).getTime() -
                                  new Date(project.createdAt).getTime()
                                ) /
                                (1000 * 3600 * 24)
                              )
                          }}d
                        </div>
                      </div>
                      <div class="projectName ellipsis">
                        {{ project.name }}
                      </div>
                      <div class="hstack">
                        <div class="ms-auto">
                          <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal"
                            data-bs-target="#editProject" @click.stop="getEditProject(project.id)">
                            Edit
                          </button>
                        </div>
                        <button type="button" class="btn btn-sm btn-danger" @click.stop="deleteProject(project.id)">
                          Delete
                        </button>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="getAllProjects.length === 0 && search" class="noProjects">
          <h3>No projects with this name or type 🤷‍♀️</h3>
        </div>
      </div>
      <div style="height: 0px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useProjectsStore } from '../stores/projects';

interface Data {
  search: string;
  projectTemp: {
    id?: number;
    name?: string;
  };
}

export default {
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
    async deleteProject(projectId: number) {
      await this.projectsStore.deleteProject(projectId);
      this.projectsStore.getAllProjectsApi();
    },
  },
};
</script>

<style scoped>
.block {
  width: 24px;
}

.panel {
  width: 100%;
  height: 52px;
  padding-right: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  --dropdown-bg: transparent;
  --dropdown-bg-hover: #f7f7f7;
  --dropdown-bg-active: #dbd9db;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 76px;
  background-color: #fff;
  z-index: 20;
}

.panel .panelContainer:first-of-type {
  justify-content: flex-start;
}

.panel .panelContainer.margin {
  flex: 0 1 auto;
  margin-right: 12px;
}

.panel .panelContainer {
  display: flex;
  align-items: center;
  flex: 1;
}

.sort {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: var(--dropdown-width, auto);
  height: var(--dropdown-height, 28px);
  background-color: transparent;
  padding: 0 12px;
  border-radius: 2px;
  cursor: pointer;
}

.sort span {
  font-size: var(--dropdown-label-font-size, 15px);
  font-weight: var(--dropdown-label-font-weight, normal);
  line-height: 18px;
  color: #554d56;
  flex-shrink: 1;
}

.sort .chevron {
  margin: 2px 0 0 6px;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.panel .search {
  width: 140px;
  height: 28px;
  padding: 0 12px;
  border-radius: 2px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: text;
}

.search svg {
  margin-right: 6px;
}

svg:not(:root),
symbol,
image,
marker,
pattern,
foreignObject {
  overflow-x: hidden;
  overflow-y: hidden;
}

input[type='search'] {
  appearance: textfield;
}

.search input {
  font-size: 15px;
  color: #554d56;
  background-color: transparent;
  transition: width 0.1s ease-out;
  caret-color: #419bf9;
  flex: initial;
  width: calc(100% - 22px);
}

.search:focus-within {
  padding: 0 10px;
  background-color: #fff;
  border: 2px solid #edeced;
}

input {
  -webkit-text-fill-color: currentColor;
}

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}

.search:focus-within input[type='search']::-webkit-search-decoration,
.search:focus-within input[type='search']::-webkit-search-cancel-button,
.search:focus-within input[type='search']::-webkit-search-results-button,
.search:focus-within input[type='search']::-webkit-search-results-decoration {
  display: block;
}

.panel .panelContainer:last-of-type {
  justify-content: flex-end;
}

.buttonCreate {
  position: relative;
  display: flex;
}

.button.primary {
  background-color: #419bf9;
  color: #fff;
}

.button.ninja,
.button.primary,
.button.secondary,
.button.warning {
  min-width: 72px;
  height: 28px;
  padding: 5px 12px;
  border-radius: 2px;
  line-height: 18px;
  font-size: 15px;
}

.button {
  position: relative;
  background: transparent none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}

.dragDropContainer .dragDropItems {
  overflow: auto;
  height: 100%;
  position: relative;
}

.projectsContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, 296px);
  grid-gap: 24px 0;
  justify-content: center;
  padding: 12px 36px 24px;
}

.noProjects {
  padding: 60px 84px 108px;
  text-align: center;
}

.noProjects h3 {
  line-height: 28px;
  font-weight: 300;
  font-size: 24px;
  color: #554d56;
  margin-bottom: 12px;
}

.cardConteiner {
  position: relative;
}

.popoverContainer {
  line-height: 0;
  cursor: pointer;
}

.cardConteiner .card {
  position: relative;
  width: 272px;
  border-radius: 2px;
  border: 1px solid #edeced;
  cursor: pointer;
}

.card .badgeConteiner {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  max-width: 100%;
  display: flex;
  pointer-events: none;
}

a {
  text-decoration: none;
  font-weight: normal;
}

.card .myBadge {
  flex-shrink: 1;
  margin-left: auto;
  z-index: 17;
  max-width: 100%;
  min-width: 0;
}

.imageContainer {
  width: 100%;
  height: 92px;
  background-color: #fbfbfb;
}

.cardBody {
  padding: 18px 12px 12px;
  background-color: #fff;
}

.button.secondary {
  background-color: #edeced;
  color: #554d56;
}

.button.ninja,
.button.primary,
.button.secondary,
.button.warning {
  min-width: 72px;
  height: 28px;
  padding: 5px 12px;
  border-radius: 2px;
  line-height: 18px;
  font-size: 15px;
}

.button {
  position: relative;
  background: transparent none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}

.statusIndicator {
  display: flex;
  align-items: center;
  background-color: #fff;
  max-width: 100%;
  height: 22px;
  padding: 3px 8px 3px 5px;
  border: 1px solid #edeced;
  border-radius: 12px;
}

.colorDot.yellow {
  --circle-color: #fecf33;
}

.colorDot.small {
  width: 12px;
  height: 12px;
}

.colorDot {
  border-radius: 50%;
  background-color: #fecf33;
}

.statusIndicator span {
  flex-shrink: 1;
  color: #554d56;
  font-size: 14px;
  line-height: 18px;
  margin-left: 4px;
}

.imageContainer .projectImage {
  width: 100%;
  height: 92px;
  object-fit: scale-down;
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.cardBody .typeAndTimeAgo {
  display: flex;
  justify-content: space-between;
}

.cardBody .projectName {
  margin-bottom: 18px;
  line-height: 21px;
  font-size: 18px;
  color: #554d56;
}

.memberAvatarList {
  display: flex;
  height: 30px;
}

.cardBody .typeAndTimeAgo .projectType {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #419bf9;
  margin-bottom: 6px;
}

.cardBody .typeAndTimeAgo .timeAgo {
  font-size: 14px;
  line-height: 16px;
  color: #979197;
}
</style>
