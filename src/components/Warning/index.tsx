import { WarningTuple } from "../../util/getHttpErrors";
import { WarningEl } from "./styles";

type WarningProps = {
    value: WarningTuple;
}

const Warning = ({ value }: WarningProps) => {
    return (
        <WarningEl
            color={value[0]}
            $showWarning={value[1] !== ""}
        >
            {value[1]}
        </WarningEl>
    )
}

export default Warning;