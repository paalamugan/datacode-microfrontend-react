import { render } from "@testing-library/react";
import Technology from "./technology.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Technology name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
