import { render } from '@testing-library/react'
import AccountsListTable from '../AccountsListTable'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})