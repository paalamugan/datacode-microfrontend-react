import { render } from "@testing-library/react";
import Footer from "./footer.component";

describe("Footer component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Footer name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
