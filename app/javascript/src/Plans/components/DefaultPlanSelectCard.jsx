// @flow

import React, { useState } from 'react'
import { post } from 'utilities/ajax'
import {
  Form,
  FormGroup,
  Card,
  CardBody
} from '@patternfly/react-core'
import { DefaultPlanSelect } from 'Plans'
import { Spinner } from 'Common'
import * as alert from 'utilities/alert'
import type { Product, ApplicationPlan } from 'Types'
import './DefaultPlanSelectCard.scss'

export type Props = {
  product: Product,
  initialDefaultPlan: ApplicationPlan | null,
  path: string
}

const NO_DEFAULT_PLAN: ApplicationPlan = { id: -1, name: '(No default plan)' }

const DefaultPlanSelectCard = ({ product, initialDefaultPlan, path }: Props) => {
  const [defaultPlan, setDefaultPlan] = useState<ApplicationPlan>(initialDefaultPlan ?? NO_DEFAULT_PLAN)

  const [isLoading, setIsLoading] = useState(false)

  const onSelectPlan = (plan: ApplicationPlan) => {
    const body = plan.id >= 0 ? new URLSearchParams({ id: plan.id.toString() }) : undefined
    const url = path.replace(':id', String(product.id))

    post(url, body)
      .then(data => {
        if (data.ok) {
          alert.notice('Default plan was updated')
          setDefaultPlan(plan)
        } else {
          if (data.status === 404) {
            alert.error("The selected plan doesn't exist.")
          } else {
            alert.error('Plan could not be updated')
          }
        }
      })
      .catch(err => {
        console.error(err)
        alert.error('An error ocurred. Please try again later.')
      })
      .finally(() => setIsLoading(false))

    setIsLoading(true)
  }

  const availablePlans = [NO_DEFAULT_PLAN, ...product.appPlans].filter(p => p.id !== defaultPlan.id)

  return (
    <Card id="default_plan_card">
      <CardBody>
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup
            label="Default plan"
            fieldId="application_plan_id"
            helperText="Default application plan (if any) is selected automatically upon service subscription."
          >
            {isLoading && <Spinner size='sm' className='pf-u-ml-md' />}
            <DefaultPlanSelect
              plan={defaultPlan}
              plans={availablePlans}
              onSelectPlan={onSelectPlan}
              isDisabled={isLoading}
            />
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export { DefaultPlanSelectCard }
