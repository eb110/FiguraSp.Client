import React, { type PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../../src/app/store/store";

export function renderWithProviders(ui: React.ReactElement) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store, user, and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper } as RenderOptions),
  };
}
