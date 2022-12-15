<template>
  <div v-for="project in projects" :key="project.id">
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
              <img
                class="projectImage"
                width="270"
                height="92"
                src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2F1ef6e135-a095-40bb-a7a6-ef091643fe44.png?w=270&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=270&amp;cropHeight=92"
              />
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
                  <button
                    type="button"
                    class="btn btn-sm btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editProject"
                    @click.stop="getEditProject(project.id)"
                  >
                    Edit
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click.stop="deleteProject(project.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Project {
  id: number;
  name: string;
  createdAt: string;
}

export default defineComponent({
  props: {
    projects: {
      type: Array<Project>,
      required: true,
    },
  },
  setup() {
    return {};
  },
  methods: {
    deleteProject(id: number) {
      this.$emit('delete', id);
    },
  },
});
</script>

<style scoped></style>
