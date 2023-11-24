import assert from 'assert';
import { shallowMount } from '@vue/test-utils'
import Compose from '../../src/pages/compose/Compose.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Compose);
    assert(wrapper.find('button').exists());
  })
})