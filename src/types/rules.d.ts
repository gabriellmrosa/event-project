interface Lote {
  lote: number;
  descricao: string;
  atracoes: string[];
  mais_info?: string;
  meta: number;
  preco: number;
  status: 'active' | 'pending' | 'sold_out';
}
  
interface GlobalRules {
  travamento_apos_lote?: number | null;
  liberacao_automatica?: boolean;
}
  
interface RulesConfig {
  global_rules: GlobalRules;
  lotes: Lote[];
}
  
declare module '*.json' {
  const value: RulesConfig;
  export default value;
}