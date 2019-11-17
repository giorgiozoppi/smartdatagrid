// Generated from /mnt/c/Users/Usuario/sandbox/snapshot/karveweb/karveweb/src/FrontEnd/js/src/grid_formula/grid_formula.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class grid_formulaParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, NL=7, NUMBER=8;
	public static final int
		RULE_formulas = 0, RULE_formula = 1, RULE_baseformula = 2, RULE_emptyLine = 3, 
		RULE_op = 4;
	public static final String[] ruleNames = {
		"formulas", "formula", "baseformula", "emptyLine", "op"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'percent'", "'col'", "'div'", "'sum'", "'mul'", "'min'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, null, null, null, "NL", "NUMBER"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "grid_formula.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public grid_formulaParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class FormulasContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(grid_formulaParser.EOF, 0); }
		public List<FormulaContext> formula() {
			return getRuleContexts(FormulaContext.class);
		}
		public FormulaContext formula(int i) {
			return getRuleContext(FormulaContext.class,i);
		}
		public List<EmptyLineContext> emptyLine() {
			return getRuleContexts(EmptyLineContext.class);
		}
		public EmptyLineContext emptyLine(int i) {
			return getRuleContext(EmptyLineContext.class,i);
		}
		public FormulasContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formulas; }
	}

	public final FormulasContext formulas() throws RecognitionException {
		FormulasContext _localctx = new FormulasContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_formulas);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(14);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << NL))) != 0)) {
				{
				setState(12);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__0:
				case T__2:
				case T__3:
				case T__4:
				case T__5:
					{
					setState(10);
					formula();
					}
					break;
				case NL:
					{
					setState(11);
					emptyLine();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(16);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(17);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FormulaContext extends ParserRuleContext {
		public OpContext op() {
			return getRuleContext(OpContext.class,0);
		}
		public List<BaseformulaContext> baseformula() {
			return getRuleContexts(BaseformulaContext.class);
		}
		public BaseformulaContext baseformula(int i) {
			return getRuleContext(BaseformulaContext.class,i);
		}
		public TerminalNode NUMBER() { return getToken(grid_formulaParser.NUMBER, 0); }
		public FormulaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formula; }
	}

	public final FormulaContext formula() throws RecognitionException {
		FormulaContext _localctx = new FormulaContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_formula);
		try {
			setState(30);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(19);
				op();
				setState(20);
				baseformula();
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(22);
				op();
				setState(23);
				baseformula();
				setState(24);
				baseformula();
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				{
				setState(26);
				baseformula();
				}
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				{
				setState(27);
				match(T__0);
				setState(28);
				match(NUMBER);
				setState(29);
				baseformula();
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BaseformulaContext extends ParserRuleContext {
		public OpContext op() {
			return getRuleContext(OpContext.class,0);
		}
		public List<TerminalNode> NUMBER() { return getTokens(grid_formulaParser.NUMBER); }
		public TerminalNode NUMBER(int i) {
			return getToken(grid_formulaParser.NUMBER, i);
		}
		public List<TerminalNode> NL() { return getTokens(grid_formulaParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(grid_formulaParser.NL, i);
		}
		public BaseformulaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_baseformula; }
	}

	public final BaseformulaContext baseformula() throws RecognitionException {
		BaseformulaContext _localctx = new BaseformulaContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_baseformula);
		try {
			int _alt;
			setState(49);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(32);
				op();
				setState(33);
				match(T__1);
				setState(34);
				match(NUMBER);
				setState(36); 
				_errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(35);
						match(NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(38); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
				} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(40);
				op();
				setState(41);
				match(T__1);
				setState(42);
				match(NUMBER);
				setState(43);
				match(NUMBER);
				setState(45); 
				_errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(44);
						match(NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(47); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
				} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EmptyLineContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(grid_formulaParser.NL, 0); }
		public EmptyLineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_emptyLine; }
	}

	public final EmptyLineContext emptyLine() throws RecognitionException {
		EmptyLineContext _localctx = new EmptyLineContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_emptyLine);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(51);
			match(NL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OpContext extends ParserRuleContext {
		public OpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_op; }
	}

	public final OpContext op() throws RecognitionException {
		OpContext _localctx = new OpContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_op);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(53);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__3) | (1L << T__4) | (1L << T__5))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\n:\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\3\2\7\2\17\n\2\f\2\16\2\22\13\2\3\2\3\2"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3!\n\3\3\4\3\4\3\4\3\4"+
		"\6\4\'\n\4\r\4\16\4(\3\4\3\4\3\4\3\4\3\4\6\4\60\n\4\r\4\16\4\61\5\4\64"+
		"\n\4\3\5\3\5\3\6\3\6\3\6\2\2\7\2\4\6\b\n\2\3\3\2\5\b\2<\2\20\3\2\2\2\4"+
		" \3\2\2\2\6\63\3\2\2\2\b\65\3\2\2\2\n\67\3\2\2\2\f\17\5\4\3\2\r\17\5\b"+
		"\5\2\16\f\3\2\2\2\16\r\3\2\2\2\17\22\3\2\2\2\20\16\3\2\2\2\20\21\3\2\2"+
		"\2\21\23\3\2\2\2\22\20\3\2\2\2\23\24\7\2\2\3\24\3\3\2\2\2\25\26\5\n\6"+
		"\2\26\27\5\6\4\2\27!\3\2\2\2\30\31\5\n\6\2\31\32\5\6\4\2\32\33\5\6\4\2"+
		"\33!\3\2\2\2\34!\5\6\4\2\35\36\7\3\2\2\36\37\7\n\2\2\37!\5\6\4\2 \25\3"+
		"\2\2\2 \30\3\2\2\2 \34\3\2\2\2 \35\3\2\2\2!\5\3\2\2\2\"#\5\n\6\2#$\7\4"+
		"\2\2$&\7\n\2\2%\'\7\t\2\2&%\3\2\2\2\'(\3\2\2\2(&\3\2\2\2()\3\2\2\2)\64"+
		"\3\2\2\2*+\5\n\6\2+,\7\4\2\2,-\7\n\2\2-/\7\n\2\2.\60\7\t\2\2/.\3\2\2\2"+
		"\60\61\3\2\2\2\61/\3\2\2\2\61\62\3\2\2\2\62\64\3\2\2\2\63\"\3\2\2\2\63"+
		"*\3\2\2\2\64\7\3\2\2\2\65\66\7\t\2\2\66\t\3\2\2\2\678\t\2\2\28\13\3\2"+
		"\2\2\b\16\20 (\61\63";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}