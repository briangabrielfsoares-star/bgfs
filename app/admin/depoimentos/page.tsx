import { AuthGate } from "@/components/admin/AuthGate";
import { CollectionManager } from "@/components/admin/CollectionManager";

export default function Page() {
  return <AuthGate><CollectionManager collectionName="Testimonials" title="Depoimentos" defaults={{ name: "", company: "", text: "", rating: 5, order: 1, active: true }} fields={[{name:"name",label:"Nome"},{name:"company",label:"Empresa"},{name:"rating",label:"Nota",type:"number"},{name:"order",label:"Ordem",type:"number"},{name:"active",label:"Status",type:"checkbox"},{name:"text",label:"Depoimento",type:"textarea"}]} /></AuthGate>;
}
