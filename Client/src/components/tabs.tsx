import { type TabsProps, Tabs } from "@mui/joy"

const CustomTabs = (props: TabsProps) => {
    const {children} = props;
    return  (
        <Tabs sx={{bgcolor:"transparent"}} {...props}>{children}</Tabs>
    )
}

export default CustomTabs;