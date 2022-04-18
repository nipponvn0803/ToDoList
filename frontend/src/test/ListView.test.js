import "@testing-library/jest-dom";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3001;

const mockToDoList = [
  {
    id: 1,
    text: "Go to Mordor",
    done: false,
  },
  {
    id: 2,
    text: "Throw the Ring in Mt.Doom",
    done: false,
  },
  {
    id: 3,
    text: "Usurp Saruman from the Shire",
    done: false,
  },
  {
    id: 4,
    text: "Help Sam plant the Mallorn seed",
    done: false,
  },
];

const server = setupServer(
  rest.get(`http://localhost:${BACKEND_PORT}/`, (req, res, ctx) => {
    return res(ctx.json(mockToDoList));
  }),

  rest.post(`http://localhost:${BACKEND_PORT}/update/1`, (req, res, ctx) => {
    return res(
      ctx.json(
        mockToDoList.map((object) =>
          object.id === 1 ? { ...object, done: !object.done } : object
        )
      )
    );
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

it("Loads and displays to do tasks", async () => {
  render(<App />);

  expect(screen.getByTestId("list-header")).toHaveTextContent("To do list");
  const itemContainers = await screen.findAllByTestId("item-container");
  // should render all the tasks in list
  expect(itemContainers).toHaveLength(mockToDoList.length);
});

describe("Update tasks status", () => {
  it("Can update tasks status by clicking checkbox", async () => {
    render(<App />);

    const itemCheckBoxes = await screen.findAllByTestId("item-checkbox");
    // the first task should not be checked
    expect(itemCheckBoxes[0]).toHaveAttribute("data-checked", "false");

    fireEvent.click(itemCheckBoxes[0]);

    // the first task should now be checked
    await waitFor(() =>
      expect(itemCheckBoxes[0]).toHaveAttribute("data-checked", "true")
    );
  });

  it("Can update tasks status by clicking text", async () => {
    render(<App />);

    const itemTexts = await screen.findAllByTestId("item-text");
    // the first task should not have class is-done
    expect(itemTexts[0]).not.toHaveClass("is-done");

    fireEvent.click(itemTexts[0]);

    // the first task should now have class is-done
    await waitFor(() => expect(itemTexts[0]).toHaveClass("is-done"));
  });
});

describe("Handle server error", () => {
  it("GET method error", async () => {
    //   mock an error response
    server.use(
      rest.get(`http://localhost:${BACKEND_PORT}/`, (req, res, ctx) => {
        return res(
          ctx.status(501),
          ctx.json({
            errorMessage: "Something wrong",
          })
        );
      })
    );

    render(<App />);

    // should now should error message
    await waitFor(() =>
      expect(screen.getByTestId("error-text")).toHaveTextContent(
        "Fail to fetch tasks list."
      )
    );
  });

  it("POST method error", async () => {
    server.use(
      rest.post(
        `http://localhost:${BACKEND_PORT}/update/1`,
        (req, res, ctx) => {
          return res(
            ctx.status(501),
            ctx.json({
              errorMessage: "Something wrong",
            })
          );
        }
      )
    );

    render(<App />);

    const itemCheckBoxes = await screen.findAllByTestId("item-checkbox");

    fireEvent.click(itemCheckBoxes[0]);

    await waitFor(() =>
      expect(screen.getByTestId("error-text")).toHaveTextContent(
        "Fail to update task."
      )
    );
  });
});
