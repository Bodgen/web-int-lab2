<template>
  <div class="wrapper">
    <nav class="navbar navbar-light bg-light">
      <div class="container d-flex justify-content-between">
        <RouterLink to="/about">
          <button class="btn btn-outline-secondary">About</button>
        </RouterLink>
        <div class="navbar-brand d-flex align-items-center logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-gem mr-25" viewBox="0 0 16 16">
            <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495L8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817l5.123-6.83-2.928.002-2.195 6.828z"/>
          </svg>
          <h1> Blog APP </h1>
        </div>
        <RouterLink to="/profile">
          <button class="btn btn-outline-secondary">Profile</button>
        </RouterLink>
      </div>
    </nav>
    <div class="container d-flex flex-column align-items-center">
      <button
          type="button"
          class="btn btn-outline-secondary add-btn"
          @click="openModal"
      >
        Add Post
      </button>
      <div class="col-sm-6 " id="posts-container">
        <div v-for="post in postsStore.posts" :key="post.id" class="card blog-item">
          <div class="card-header">
            <h2 class="bold">{{ post.title }}</h2>
          </div>
          <div class="card-body ">
            <p class="card-text">{{ post.description }}</p>
            <div class="buttons">
              <button type="button" class="button me-2 edit-btn" @click="editPost(post.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
              <button type="button" class="button remove-btn" @click="removePost(post.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
            <div>
              <div class="comments" v-if="post.comments?.length">
                <h3>Comments</h3>
                <div class="card mb-3" v-for="comment in post.comments" :key="post.id+comment.date.toString()">
                  <div class="card-body">
                    <div class="d-flex justify-content-between w-100">
                      <h6 class="card-subtitle mb-2 text-muted inline-block">{{formatDate(comment.date) }}</h6>
                      <button type="button" class="btn btn-danger btn-sm delete-comment-btn" @click="removeComment(post.id, comment.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                      </button>
                    </div>
                    <p class="card-text">{{ comment.description }}</p>
                  </div>
                </div>
              </div>
              <div class="input-group">
                <input name="comment" type="text" class="form-control" placeholder="Add a comment" v-model="commentNote">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click="addComment(post.id)" :disabled="!commentNote.trim()">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <add-post-modal ref="addPostModal" @add="onAdd" @edit="onEdit" :newPost="newPost" :posts="postsStore.posts"></add-post-modal>
</template>

<script lang="ts">
import { postsStore } from '@/stores/posts.store';
import AddPostModal, { type ModalComponent } from "@/components/AddPostModalComponent.vue";
import type { IPost } from "@/interfaces/post.interface";
import { DateTime } from "luxon";

export default {
  components: {
    AddPostModal,
  },
  data() {
    return {
      modal: null,
      postsStore: postsStore(),
      newPost: {
        title: '',
        description: '',
        id: null,
        comments: [],
      },
      commentNote: '',
    };
  },
  mounted() {
    this.postsStore.setPostsFromLocalStorage();
    const modalElement = this.$refs?.addPostModal?.$el;
    modalElement?.addEventListener('hidden.bs.modal', () => this.clearModalFields());
  },
  methods: {
    openModal() {
      if (this.$refs?.addPostModal) {
        (this.$refs.addPostModal as ModalComponent).show();
      }
    },

    onAdd(post:IPost) {
      this.postsStore.addPost(post);
      if (this.$refs.addPostModal && (this.$refs.addPostModal as ModalComponent).hide) {
        (this.$refs.addPostModal as ModalComponent).hide();
      }
    },

    onEdit(post: IPost) {
      this.postsStore.editPost(post);
    },

    removePost(id: number) {
      this.postsStore.removePost(id);
    },

    clearModalFields(): void {
      if (this.$refs.addPostModal && (this.$refs.addPostModal as ModalComponent).clearData) {
        (this.$refs.addPostModal as ModalComponent).clearData();
      }
    },

    editPost(postId: number) {
      const post = this.postsStore.getPostById(postId);
      if (post) {
        if (this.$refs.addPostModal && (this.$refs.addPostModal as ModalComponent).showEditMode) {
          (this.$refs.addPostModal as ModalComponent).showEditMode(postId);
        }
      }
    },

    addComment(postId: number): void {
        const newComment = {
          id: Math.floor(Math.random() * 1000),
          date: new Date().toISOString(), // Тут можна змінити формат дати на більш зручний
          description: this.commentNote.trim(),
        }
        this.postsStore.addComment(postId, newComment);
        this.commentNote = ''; // Очищаємо інпут після додавання коментаря
    },

    removeComment(postId: number, commentId: number): void {
      this.postsStore.removeComment(postId, commentId);
    },

    formatDate(date: string): string {
      return DateTime.fromISO(date).toFormat('T, MMM d yyyy', { locale: 'en' });
    }
  }
};
</script>

<style>
* {
  font-family: "Georgia", monospace !important;
}

.wrapper {
  height: 100vh;
}


a {
  text-decoration: none;
}

nav {
  margin-bottom: 35px;
}

.logo svg {
  margin-right: 15px;
}

.content h1 {
  font-weight: bold;
  margin-top: 25px;
  font-size: 65px;
}

h2 {
  font-weight: bold;
}

.card {
  margin-bottom: 10px;
}

.card-body {
  position: relative;
}

.buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}

.button {
  background: none;
  border: 1px solid #000000;
  transition: all .5s;
}

.button:hover {
  background: #000000;
  color: #eeeeee;
}

.add-btn {
  margin-bottom: 15px;
}
</style>
