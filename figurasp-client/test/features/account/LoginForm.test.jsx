import { describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  renderHook,
} from "@testing-library/react";
import { store } from "../../../src/app/store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../../src/features/account/LoginForm";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";

describe("Login form component", () => {
  it("renders it correctly", async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { type: /password/i }),
    ).toBeInTheDocument();

    // screen.debug(undefined, 100_000);
  });
  it.skip("login form submits correctly", async () => {
    render(
      <Provider store={store}>
        <LoginForm />,
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const emailInput = await screen.findByRole("textbox", {
      name: /email/i,
      type: /text/i,
    });

    fireEvent.input(emailInput, {
      target: { value: "test@example.com" },
    });

    const passwordInput = await screen.findByRole("textbox", {
      type: /password/i,
    });
    fireEvent.input(passwordInput, {
      target: { value: "joasia" },
    });
    // fireEvent.type(emailInput, "test@example.com");
    // fireEvent.type(passwordInput, "joasia");
    // fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // fireEvent.touchStart(emailInput);
    //    fireEvent.touchEnd(emailInput);
    //   fireEvent.touchStart(passwordInput);

    // fireEvent.click(emailInput);
    //  fireEvent.change(emailInput, {
    //      target: { value: "test@example.com", placeholder: "test@example.com" },
    //    });
    // await userEvent.type(emailInput, "test@example.com");
    // fireEvent.change(passwordInput, {
    //   target: { value: "joasia", placeholder: "joasia" },
    // });

    const loginButton = await screen.findByRole("button", { name: /sign in/i });
    fireEvent.submit(loginButton);
    // await user.click(loginButton);
    //  expect(handleSubmit).toHaveBeenCalled();
    // await waitFor(() =>
    //   expect(screen.getByText(/invalid email address/i)).toBeInTheDocument(),
    // );
    //    fireEvent.click(passwordInput);
    // await screen.findByText(/test@example.com/i);
    // await waitFor(() =>
    //   expect(screen.getByText(/test@example.com/i)).toBeInTheDocument(),
    // );
    await waitFor(() =>
      expect(
        screen.getByText(/password must be at least 6 characters long/i),
      ).toBeInTheDocument(),
    );
    // console.log("INPUT: ", emailInput);
    // await waitFor(() =>
    //   expect(
    //     screen.getByText(/password must be at least 6 characters long/i),
    //   ).toBeInTheDocument(),
    // );
    //console.log(loginButton);
    // expect(loginButton.disabled).toBe(true);
    //    fireEvent.click(loginButton);
    screen.debug(undefined, 100_000);
  });
  it("login form submits incorrectly", async () => {
    render(
      <Provider store={store}>
        <LoginForm />,
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const loginButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(loginButton);
    await waitFor(() =>
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.getByText(/password must be at least 6 characters long/i),
      ).toBeInTheDocument(),
    );
  });
});
