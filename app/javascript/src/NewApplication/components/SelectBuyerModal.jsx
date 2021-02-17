// @flow

import React from 'react'

import { SelectModal } from 'Common'

import type { Buyer } from 'NewApplication/types'

type Props = {
  isOpen?: boolean,
  buyer: Buyer | null,
  buyers: Buyer[],
  onSelectBuyer: (Buyer) => void,
  onClose: () => void
}

const SelectBuyerModal = ({ isOpen, buyer, buyers, onSelectBuyer, onClose }: Props) => {
  const cells = [
    { title: 'Name', propName: 'name' },
    { title: 'Admin', propName: 'admin' },
    { title: 'Signup date', propName: 'createdAt' }
  ]

  return (
    <SelectModal
      title="Select a Buyer"
      isOpen={isOpen}
      // $FlowFixMe $FlowIssue It should not complain since Record.id has union "number | string"
      item={buyer}
      // $FlowFixMe $FlowIssue It should not complain since Record.id has union "number | string"
      items={buyers}
      onSelect={onSelectBuyer}
      onClose={onClose}
      cells={cells}
    />
  )
}

export { SelectBuyerModal }
