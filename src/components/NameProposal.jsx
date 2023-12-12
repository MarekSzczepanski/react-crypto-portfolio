const NameProposal = ({ currencyId, name, handleProposalClick }) => {
  return (
    <div
      className="proposal"
      data-currency_id={currencyId}
      onClick={handleProposalClick}
    >
      {name}
    </div>
  );
};

export default NameProposal;
