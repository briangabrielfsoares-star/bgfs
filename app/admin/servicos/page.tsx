import { AuthGate } from "@/components/admin/AuthGate";
import { CollectionManager } from "@/components/admin/CollectionManager";

export default function Page() {
  return <AuthGate><CollectionManager collectionName="Services" title="Serviços" defaults={{ title: "", description: "", icon: "Globe", order: 1, active: true }} fields={[{name:"title",label:"Título"},{name:"icon",label:"Ícone/texto"},{name:"order",label:"Ordem",type:"number"},{name:"active",label:"Status",type:"checkbox"},{name:"description",label:"Descrição",type:"textarea"}]} /></AuthGate>;
}
