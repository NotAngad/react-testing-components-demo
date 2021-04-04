import ReactDOM from "react-dom";
import Login from "./../Login";
import axiosMock from "axios";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("Login Test Cases", () => {
  it("should render the component", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login />, div);
  });

  it("check input values presence", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-test-input");
    expect(emailInput).toBeTruthy();

    const passwordInput = getByTestId("password-test-input");
    expect(passwordInput).toBeTruthy();

    const submitInput = getByTestId("submit-test-input");
    expect(submitInput).toBeTruthy();
  });

  it("check if input values can be changed", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-test-input");
    fireEvent.change(emailInput, {
      target: {
        value: "myrandom@email.com",
      },
    });

    const passwordInput = getByTestId("password-test-input");
    fireEvent.change(passwordInput, {
      target: {
        value: "somegibberish",
      },
    });

    expect(emailInput.value).toBe("myrandom@email.com");
  });

  it("Press Submit Button without entering any texts", () => {
    const { getByTestId } = render(<Login />);
    const submitInput = getByTestId("submit-test-input");
    fireEvent.click(submitInput);

    const emailErrorText = getByTestId("email-error-text");
    expect(emailErrorText).toBeInTheDocument();

    const passwordErrorText = getByTestId("password-error-text");
    expect(passwordErrorText).toBeInTheDocument();
  });

  it("Press Submit Button with appropriate details", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        id: 1,
        name: "Leanne Arch",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    });
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-test-input");
    fireEvent.change(emailInput, {
      target: {
        value: "myrandom@email.com",
      },
    });

    const passwordInput = getByTestId("password-test-input");
    fireEvent.change(passwordInput, {
      target: {
        value: "somegibberish",
      },
    });

    fireEvent.click(getByTestId("submit-test-input"));
    const resolvedSpan = await waitFor(() =>
      getByTestId("login-username-text")
    );
    expect(resolvedSpan).toHaveTextContent("Leanne Arch");
  });
});
