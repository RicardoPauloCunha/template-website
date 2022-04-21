import React from "react"

import { CardBody, CardTitle } from "reactstrap"
import { DataCardEl } from "./styles"

type DataCardProps = {
    title: string;
    children?: React.ReactNode;
}

const DataCard = ({ title, children }: DataCardProps): JSX.Element => {
    return (
        <DataCardEl>
            <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>

                {children}
            </CardBody>
        </DataCardEl>
    )
}

export default DataCard;