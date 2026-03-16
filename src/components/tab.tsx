import { Tab, type TabProps } from "@mui/joy"

const CustomTab = (props: TabProps) => {
    const {children} = props;
    return <Tab disableIndicator {...props}>{children}</Tab>
}
export default CustomTab;