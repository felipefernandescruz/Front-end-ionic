export class BrStates {
    
        public static readonly AC = new BrStates("AC", "Acre");
        public static readonly AL = new BrStates("AL", "Alagoas");
        public static readonly AP = new BrStates("AP", "Amapá");
        public static readonly AM = new BrStates("AM", "Amazonas");
        public static readonly BA = new BrStates("BA", "Bahia");
        public static readonly CE = new BrStates("CE", "Ceará");
        public static readonly DF = new BrStates("DF", "Distrito Federal");
        public static readonly ES = new BrStates("ES", "Espírito Santo");
        public static readonly GO = new BrStates("GO", "Goiás");
        public static readonly MA = new BrStates("MA", "Maranhão");
        public static readonly MT = new BrStates("MT", "Mato Grosso");
        public static readonly MS = new BrStates("MS", "Mato Grosso do Sul");
        public static readonly MG = new BrStates("MG", "Minas Gerais");
        public static readonly PA = new BrStates("PA", "Pará");
        public static readonly PB = new BrStates("PB", "Paraíba");
        public static readonly PR = new BrStates("PR", "Paraná");
        public static readonly PE = new BrStates("PE", "Pernambuco");
        public static readonly PI = new BrStates("PI", "Piauí");
        public static readonly RJ = new BrStates("RJ", "Rio de Janeiro");
        public static readonly RN = new BrStates("RN", "Rio Grande do Norte");
        public static readonly RS = new BrStates("RS", "Rio Grande do Sul");
        public static readonly RO = new BrStates("RO", "Rondônia");
        public static readonly RR = new BrStates("RR", "Roraima");
        public static readonly SC = new BrStates("SC", "Santa Catarina");
        public static readonly SP = new BrStates("SP", "São Paulo");
        public static readonly SE = new BrStates("SE", "Sergipe");
        public static readonly TO = new BrStates("TO", "Tocantins");
    
        public Code: string;
        public Name: string;
    
        constructor(code: string, name: string) {
            this.Code = code;
            this.Name = name;
        }
    
        public static List() {
            return [
                this.AC, this.AL, this.AP, this.AM, this.BA, this.CE, this.DF, this.ES, this.GO, 
                this.MA, this.MT, this.MS, this.MG, this.PA, this.PB, this.PR, this.PE, this.PI, 
                this.RJ, this.RN, this.RS, this.RO, this.RR, this.SC, this.SP, this.SE, this.TO
            ];
        }
    }