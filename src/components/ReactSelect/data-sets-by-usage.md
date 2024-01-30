# Data Sets sent to the select component
Shown by component/page/layout that uses a specific shape

> `className` and `classNamePrefix` should be removed unless required by `react-select`
> or some styling logic (not likely)

## CentralizedExchanges

- aria-label
- options: Array
  - value: string
  - label: string
  - exchanges: string[]
- onChange: (selectedOption: same as options) => void
- placeholder

## WalletTable

- options: Array
  - label: string
  - options: Array
    - label: string
    - value: string
    - filterKey: string
    - category: string
    - icon: typeof Icon
- onChange: (selectedOption: sames as options/options) => void (has an updateDropdown() method)
- defaultValue: sameas options/options
- isSearchable: false (so it's not a combobox)

## Layer2Onboard

- options: Array
  - value: string
  - label: string
  - l2/cexOnboard: special object

## StakingLaunchpadWidget

- options: Array
  - label: ?
  - value: string
- onChange: (e: EventData) => void
- defaultValue: same as options