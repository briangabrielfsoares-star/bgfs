import { AuthGate } from "@/components/admin/AuthGate";
import { CollectionManager } from "@/components/admin/CollectionManager";

export default function Page() {
  return <AuthGate><CollectionManager collectionName="Portfolio" title="Portfólio / Cases" defaults={{ title: "", category: "", description: "", result: "", imageUrl: "", order: 1, active: true }} fields={[{name:"title",label:"Título"},{name:"category",label:"Categoria"},{name:"order",label:"Ordem",type:"number"},{name:"active",label:"Status",type:"checkbox"},{name:"imageUrl",label:"Imagem",type:"image"},{name:"description",label:"Descrição",type:"textarea"},{name:"result",label:"Resultado",type:"textarea"}]} /></AuthGate>;
}
