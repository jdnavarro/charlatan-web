import React from "react"
import renderer from "react-test-renderer"

import Container from "../index"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Container siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
