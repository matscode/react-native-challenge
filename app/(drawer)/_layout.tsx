import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="(inner)"
        options={{
          drawerLabel: "Home",
          title: "Coinscout",
        }}
      />
    </Drawer>
  );
}
