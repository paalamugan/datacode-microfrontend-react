import { render } from "@testing-library/react";
import Education from "./education.component";

describe("Education component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Education name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
