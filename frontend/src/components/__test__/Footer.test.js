import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders copyright text", () => {
    render(<Footer />);

    // Assert that the copyright text is rendered
    const copyrightText = screen.getByText("@2024 All rights reserved.");
    expect(copyrightText).toBeInTheDocument();
  });

  test("footer has the correct structure", () => {
    render(<Footer />);

    // Assert that the footer has a single <p> element
    const paragraphElement = screen.getByRole("contentinfo").querySelector("p");
    expect(paragraphElement).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<Footer />);

    // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});
