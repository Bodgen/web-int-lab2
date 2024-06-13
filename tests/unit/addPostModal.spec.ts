import { mount, VueWrapper } from '@vue/test-utils';
import AddPostModal from '@/components/AddPostModalComponent.vue';
import { IPost } from "@/interfaces/post.interface";

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('AddPostModal.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(AddPostModal, {
      props: {
        mode: '',
        posts: [],
        postId: null,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should open modal and add a new post', async () => {
    const newPost = {
      title: 'New Post Title',
      description: 'New post description',
    };

    await wrapper.setData({
      currentPost: newPost,
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().add).toBeTruthy();
    expect((wrapper.emitted().add as any)[0][0]).toEqual(expect.objectContaining(newPost));
  });

  it('should open modal and edit an existing post', async () => {
    const existingPost: IPost = {
      id: 1,
      title: 'Existing Post Title',
      description: 'Existing post description',
      comments: [],
    };

    await wrapper.setProps({
      posts: [existingPost],
      postId: 1,
    });

    await wrapper.vm.showEditMode(1);

    const editedPost = {
      id: 1,
      title: 'Edited Post Title',
      description: 'Existing post description',
      comments: [],
    };

    await wrapper.setData({
      currentPost: editedPost,
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().edit).toBeTruthy();
    expect((wrapper.emitted().edit as any)[0][0]).toEqual(editedPost);
  });

  it('should clear data when closing modal', async () => {
    const newPost = {
      title: 'Temporary Title',
      description: 'Temporary description',
    };

    await wrapper.setData({
      currentPost: newPost,
    });

    await wrapper.vm.hide();
    await wrapper.vm.clearData();

    expect(wrapper.vm.currentPost.title).toBe('');
    expect(wrapper.vm.currentPost.description).toBe('');
  });
});
