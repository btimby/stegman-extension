import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { describe, it, expect } from "vitest";

describe("HelloWorld.vue", () => {

  it("can render the message", () => {

    const message = "Hello Aaron!";
    const wrapper = mount(HelloWorld, {
      props: { message },
    });

    expect(wrapper.text()).toBe(message);
  });
});