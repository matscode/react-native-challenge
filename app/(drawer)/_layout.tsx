import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
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
