import { shallowMount } from '@vue/test-utils';
import ProfileComponent from '@/components/ProfileComponent.vue';

describe('ProfileComponent', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ProfileComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it('has a "Back to Posts" button', () => {
    const wrapper = shallowMount(ProfileComponent);
    const backButton = wrapper.find('.btn-outline-secondary');
    expect(backButton.text()).toBe('Back to Posts');
  });

  it('calls logout method when "Logout" button is clicked', async () => {
    // Мокуємо метод logout
    const logoutMock = jest.fn();
    const wrapper = shallowMount(ProfileComponent, {
      // Передаємо мок функції як проп
      global: {
        mocks: {
          logout: logoutMock
        }
      }
    });

    // Спочатку перевіряємо, чи функція logout не була викликана
    expect(logoutMock).not.toHaveBeenCalled();

    // Симулюємо клік на кнопку "Logout"
    const logoutButton = wrapper.findAll('.btn-outline-secondary')[1];
    await logoutButton.trigger('click');

    // Тепер перевіряємо, чи була викликана функція logout
    expect(logoutMock).toHaveBeenCalled();
  });
});
